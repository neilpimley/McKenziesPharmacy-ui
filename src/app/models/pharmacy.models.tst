${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

   string Inherit(Class c)
    {
    if (c.BaseClass!=null)
	    return " extends " + c.BaseClass.ToString();
      else
	     return  "";
    }

    string Imports(Class c){
      List<string> neededImports = c.Properties
	    .Where(p => !p.Type.IsPrimitive)
	    .Select(p => "import { " + p.Type.Name.TrimEnd('[',']') + " } from './" + p.Type.Name.TrimEnd('[',']') + "';").ToList();
      if (c.BaseClass != null) { 
	    neededImports.Add("import { " + c.BaseClass.Name +" } from './" + c.BaseClass.Name + "';");
      }
      return String.Join("\n", neededImports.Distinct());
    }
}
$Classes(Pharmacy.Models.*)[$Imports

export class $Name$TypeParameters$Inherit {

$Properties[    $name: $Type;
]}
]